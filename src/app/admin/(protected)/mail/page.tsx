"use client";

import { useState, useEffect } from "react";
import { updateMailConfig, getMailConfig, sendEmail } from "@/app/actions/mail";
import { FaSave, FaPaperPlane, FaSpinner } from "react-icons/fa";

export default function MailConfigPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  
  const [config, setConfig] = useState({
    host: "",
    port: 587,
    user: "",
    password: "",
    fromEmail: "",
    senderName: "", // New state
    adminEmail: "",
    adminSubject: "",
    adminBody: "",
    customerSubject: "",
    customerBody: "",
    bookingAdminSubject: "",
    bookingAdminBody: "",
    bookingCustomerSubject: "",
    bookingCustomerBody: "",
  });

  useEffect(() => {
    async function loadConfig() {
      const res = await getMailConfig();
      if (res.success && res.data) {
        setConfig({
          host: res.data.host,
          port: res.data.port,
          user: res.data.user,
          password: "", // Don't show password
          fromEmail: res.data.fromEmail,
          senderName: res.data.senderName || "",
          adminEmail: res.data.adminEmail || "",
          adminSubject: res.data.adminSubject || "",
          adminBody: res.data.adminBody || "",
          customerSubject: res.data.customerSubject || "",
          customerBody: res.data.customerBody || "",
          bookingAdminSubject: res.data.bookingAdminSubject || "",
          bookingAdminBody: res.data.bookingAdminBody || "",
          bookingCustomerSubject: res.data.bookingCustomerSubject || "",
          bookingCustomerBody: res.data.bookingCustomerBody || "",
        });
      }
      setLoading(false);
    }
    loadConfig();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: name === "port" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateMailConfig(config);
    if (res.success) {
      alert("Configuration saved successfully!");
    } else {
      alert("Failed to save configuration: " + res.error);
    }
    setSaving(false);
  };

  const handleTestEmail = async () => {
    const testEmail = prompt("Enter an email address to send a test message to:");
    if (!testEmail) return;

    setTesting(true);
    const res = await sendEmail({
      to: testEmail,
      subject: "Test Email from Brent Linen Admin",
      html: "<h1>It Works!</h1><p>Your mail configuration is correct.</p>",
    });

    if (res.success) {
      alert("Test email sent successfully!");
    } else {
      alert("Failed to send test email: " + res.error);
    }
    setTesting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-purple-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mail Configuration</h1>
        <p className="text-gray-500 mt-2">Configure SMTP settings, sender identity, and email templates.</p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-bold text-blue-800">Configuration Guide</h3>
            <div className="mt-2 text-sm text-blue-700 space-y-2">
              <details className="group">
                <summary className="font-semibold cursor-pointer hover:text-blue-900 focus:outline-none">Using Gmail? (Click to expand)</summary>
                <div className="mt-2 pl-4 border-l-2 border-blue-200 space-y-1">
                  <p>1. <strong>Host:</strong> <code>smtp.gmail.com</code></p>
                  <p>2. <strong>Port:</strong> <code>587</code></p>
                  <p>3. <strong>User:</strong> Your full Gmail address.</p>
                  <p>4. <strong>Password:</strong> You MUST use an <strong>App Password</strong>, not your login password.</p>
                  <ul className="list-disc pl-5 mt-1 text-xs">
                    <li>Go to Google Account &gt; Security.</li>
                    <li>Enable "2-Step Verification".</li>
                    <li>Search for "App passwords" and create one named "Website".</li>
                    <li>Copy that 16-character code here.</li>
                  </ul>
                </div>
              </details>

              <details className="group">
                <summary className="font-semibold cursor-pointer hover:text-blue-900 focus:outline-none">Using Outlook / Office 365? (Click to expand)</summary>
                <div className="mt-2 pl-4 border-l-2 border-blue-200 space-y-1">
                  <p>1. <strong>Host:</strong> <code>smtp.office365.com</code></p>
                  <p>2. <strong>Port:</strong> <code>587</code></p>
                  <p>3. <strong>User:</strong> Your full Outlook/Office 365 email address.</p>
                  <p>4. <strong>Password:</strong> Your email password.</p>
                  <p className="text-xs mt-1"><em>Note: If you have 2FA enabled, you may need an App Password.</em></p>
                </div>
              </details>

              <details className="group">
                <summary className="font-semibold cursor-pointer hover:text-blue-900 focus:outline-none">Using cPanel / Business Email? (Click to expand)</summary>
                <div className="mt-2 pl-4 border-l-2 border-blue-200 space-y-1">
                  <p>1. <strong>Host:</strong> Usually <code>mail.yourdomain.com</code> (Check with your host).</p>
                  <p>2. <strong>Port:</strong> <code>465</code> (SSL) or <code>587</code> (TLS).</p>
                  <p>3. <strong>User:</strong> Your full email address (e.g., <code>info@brentlinenhire.co.uk</code>).</p>
                  <p>4. <strong>Password:</strong> Your email account password.</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-xl shadow-purple-900/5 rounded-2xl p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* --- Section 1: Sender Identity --- */}
          <div>
             <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-600 text-sm font-bold">1</span>
                Sender Identity
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Sender Name</label>
                  <input
                    type="text"
                    name="senderName"
                    value={config.senderName}
                    onChange={handleChange}
                    placeholder="Brent Linen"
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                  />
                  <p className="text-xs text-gray-500 mt-2 ml-1">This name will appear in the recipient's inbox.</p>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">From Email</label>
                  <input
                    type="email"
                    name="fromEmail"
                    value={config.fromEmail}
                    onChange={handleChange}
                    placeholder="noreply@brentlinenhire.co.uk"
                    required
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                  />
                  <p className="text-xs text-gray-500 mt-2 ml-1">The email address sending the mail.</p>
                </div>
             </div>
          </div>

          {/* --- Section 2: Notifications --- */}
           <div>
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm font-bold">2</span>
                Admin Notifications
            </h2>
             <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Admin Receiver Email</label>
              <input
                type="email"
                name="adminEmail"
                value={config.adminEmail}
                onChange={handleChange}
                placeholder="info@brentlinenhire.co.uk"
                required
                className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
              />
              <p className="text-xs text-gray-500 mt-2 ml-1">Where you want to receive new query notifications.</p>
            </div>
          </div>

          {/* --- Section 3: SMTP Server Configuration --- */}
          <div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-200/60">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-200 text-gray-700 text-sm font-bold">3</span>
                SMTP Server Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">SMTP Host</label>
                  <input
                    type="text"
                    name="host"
                    value={config.host}
                    onChange={handleChange}
                    placeholder="smtp.gmail.com"
                    required
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Port</label>
                  <input
                    type="number"
                    name="port"
                    value={config.port}
                    onChange={handleChange}
                    placeholder="587"
                    required
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                  />
                </div>

                <div className="md:col-span-2 group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">SMTP User (Email)</label>
                  <input
                    type="text"
                    name="user"
                    value={config.user}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                  />
                </div>

                <div className="md:col-span-2 group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">SMTP Password</label>
                  <input
                    type="password"
                    name="password"
                    value={config.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep existing password"
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                  />
                  <p className="text-xs text-gray-500 mt-2 ml-1">For Gmail, use an App Password.</p>
                </div>
             </div>
          </div>

          {/* --- Section 4: Template Configuration --- */}
          <div>
               <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-600 text-sm font-bold">4</span>
                    Email Templates
               </h2>
               <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-8 text-sm text-orange-900 mb-8">
                  <p className="font-bold mb-2">Available Variables:</p>
                  <div className="flex flex-wrap gap-2">
                      <code className="bg-white px-2 py-1 rounded border border-orange-200 text-orange-700 font-mono text-xs">{"{{name}}"}</code>
                      <code className="bg-white px-2 py-1 rounded border border-orange-200 text-orange-700 font-mono text-xs">{"{{email}}"}</code>
                      <code className="bg-white px-2 py-1 rounded border border-orange-200 text-orange-700 font-mono text-xs">{"{{phone}}"}</code>
                      <code className="bg-white px-2 py-1 rounded border border-orange-200 text-orange-700 font-mono text-xs">{"{{message}}"}</code>
                  </div>
               </div>

               <div className="grid grid-cols-1 gap-10">
                  {/* Admin Template */}
                  <div className="space-y-5 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <h3 className="font-bold text-gray-900 text-lg">Admin Notification Template</h3>
                      <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Subject</label>
                          <input
                            type="text"
                            name="adminSubject"
                            value={config.adminSubject}
                            onChange={handleChange}
                            placeholder="New Query from {{name}}"
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                          />
                      </div>
                      <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Body (HTML)</label>
                          <textarea
                            name="adminBody"
                            value={config.adminBody}
                            onChange={handleChange}
                            rows={10}
                            placeholder="<h2>New Message</h2>..."
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-mono text-xs leading-relaxed"
                          />
                      </div>
                  </div>

                  {/* Customer Template */}
                  <div className="space-y-5 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <h3 className="font-bold text-gray-900 text-lg">Customer Auto-reply Template</h3>
                      <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Subject</label>
                          <input
                            type="text"
                            name="customerSubject"
                            value={config.customerSubject}
                            onChange={handleChange}
                            placeholder="Thanks for contacting us"
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                          />
                      </div>
                      <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Body (HTML)</label>
                          <textarea
                            name="customerBody"
                            value={config.customerBody}
                            onChange={handleChange}
                            rows={10}
                            placeholder="<p>Dear {{name}},...</p>"
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-mono text-xs leading-relaxed"
                          />
                      </div>
                  </div>
               </div>
            </div>

            {/* --- Section 5: Booking Notifications --- */}
            <div>
               <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-600 text-sm font-bold">5</span>
                    Booking Notifications
               </h2>
               <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 mb-8 text-sm text-purple-900 mb-8">
                  <p className="font-bold mb-2">Available Variables:</p>
                  <div className="flex flex-wrap gap-2">
                      <code className="bg-white px-2 py-1 rounded border border-purple-200 text-purple-700 font-mono text-xs">{"{{name}}"}</code>
                      <code className="bg-white px-2 py-1 rounded border border-purple-200 text-purple-700 font-mono text-xs">{"{{product}}"}</code>
                      <code className="bg-white px-2 py-1 rounded border border-purple-200 text-purple-700 font-mono text-xs">{"{{date}}"}</code>
                      <code className="bg-white px-2 py-1 rounded border border-purple-200 text-purple-700 font-mono text-xs">{"{{time}}"}</code>
                      <code className="bg-white px-2 py-1 rounded border border-purple-200 text-purple-700 font-mono text-xs">{"{{quantity}}"}</code>
                  </div>
               </div>

               <div className="grid grid-cols-1 gap-10">
                  {/* Admin Booking Template */}
                  <div className="space-y-5 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <h3 className="font-bold text-gray-900 text-lg">Admin Notification Template</h3>
                      <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Subject</label>
                          <input
                            type="text"
                            name="bookingAdminSubject"
                            value={config.bookingAdminSubject}
                            onChange={handleChange}
                            placeholder="New Booking Request from {{name}}"
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                          />
                      </div>
                      <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Body (HTML)</label>
                          <textarea
                            name="bookingAdminBody"
                            value={config.bookingAdminBody}
                            onChange={handleChange}
                            rows={10}
                            placeholder="<h2>New Booking</h2>..."
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-mono text-xs leading-relaxed"
                          />
                      </div>
                  </div>

                  {/* Customer Booking Template */}
                  <div className="space-y-5 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <h3 className="font-bold text-gray-900 text-lg">Customer Confirmation Template</h3>
                      <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Subject</label>
                          <input
                            type="text"
                            name="bookingCustomerSubject"
                            value={config.bookingCustomerSubject}
                            onChange={handleChange}
                            placeholder="Booking Confirmation"
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                          />
                      </div>
                      <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Body (HTML)</label>
                          <textarea
                            name="bookingCustomerBody"
                            value={config.bookingCustomerBody}
                            onChange={handleChange}
                            rows={10}
                            placeholder="<p>Dear {{name}},...</p>"
                            className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-mono text-xs leading-relaxed"
                          />
                      </div>
                  </div>
               </div>
            </div>

          <div className="flex justify-between items-center pt-8 border-t border-gray-100 sticky bottom-0 bg-white py-6 z-10 -mx-8 px-8 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] rounded-b-2xl">
            <button
              type="button"
              onClick={handleTestEmail}
              disabled={testing || saving}
              className="flex items-center gap-3 px-6 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
            >
              {testing ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
              Send Test Email
            </button>
            
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
