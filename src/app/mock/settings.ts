export interface FaqItem {
  q: string;
  a: string;
}

export const initialFaqItems: FaqItem[] = [
  {
    q: 'How do I create a new design request?',
    a: 'Navigate to the Design Requests section from the sidebar, then click the "New Request" button. Fill in the customer details, item type, and specifications. Once submitted, the request will appear in your list for review.',
  },
  {
    q: 'How do I track a shipment?',
    a: 'Go to the Shipping section from the sidebar. You can view all active shipments, their tracking numbers, and current status. Click the eye icon on any shipment to see detailed tracking information.',
  },
  {
    q: 'How can I communicate with a client?',
    a: 'Use the Chats section to message clients directly. You can find all conversations listed on the left panel. Click on a conversation to view and send messages, attach files, or upload CAD designs.',
  },
  {
    q: 'What materials are available for jewelry?',
    a: 'Available materials are managed in the Materials section. You can add metals (with carat specifications), diamond categories, and clarity grades. All materials added here will be available across the platform.',
  },
  {
    q: 'How do I update an order status?',
    a: 'Open any order by clicking the eye icon in the Orders table. In the Order Details popup, you will see status pills at the bottom. Select the new status and click "Save Changes" to update.',
  },
];

export const initialPrivacyHtml = `<h2>Information We Collect</h2><p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes your name, email address, phone number, business information, and any other information you choose to provide.</p><h2>How We Use Your Information</h2><p>We use the information we collect to provide, maintain, and improve our services, process transactions, send administrative messages, respond to your comments and questions, and for other business purposes.</p><h2>Data Security</h2><p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration, and destruction. All data is encrypted in transit and at rest using industry-standard encryption protocols.</p><h2>Third-Party Services</h2><p>We may share your information with third-party vendors and service providers that perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</p><h2>Contact Us</h2><p>If you have any questions about this Privacy Policy, please contact us at privacy@byoj.com or write to us at BYOJ Jewelry, 123 Fifth Avenue, New York, NY 10001.</p>`;

export const initialTermsHtml = `<h2>Acceptance of Terms</h2><p>By accessing and using the BYOJ platform, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service apply to all users of the platform.</p><h2>Use of Platform</h2><p>You agree to use the platform only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the platform. Prohibited behavior includes harassing or causing distress to any person and transmitting obscene content.</p><h2>Payments &amp; Fees</h2><p>All payments made through the platform are subject to our payment processing terms. Design fees, order deposits, and final payments must be completed according to the agreed schedule. Refunds are subject to our cancellation policy.</p><h2>Intellectual Property</h2><p>All designs created through BYOJ remain the intellectual property of the respective designers and customers as agreed upon in each order. Custom designs are confidential and will not be shared with third parties.</p><h2>Limitation of Liability</h2><p>BYOJ shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or goodwill, resulting from your access to or use of our services.</p><h2>Changes to Terms</h2><p>We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on the platform and updating the effective date. Your continued use of the platform after changes constitutes acceptance.</p>`;
