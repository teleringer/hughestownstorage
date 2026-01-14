'use client';

export default function Terms() {
  return (
    <div className="min-h-screen">
      <main className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using Hughestown Self-Storage services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Storage Unit Rental</h2>
              <p className="text-gray-600 mb-4">Storage unit rentals are subject to the following terms:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Minimum rental period is 30 days</li>
                <li>Rent is due monthly in advance on the 1st of each month</li>
                <li>A 10-day grace period applies before late fees</li>
                <li>Security deposit equal to one month's rent is required</li>
                <li>10 days written notice required for move-out</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prohibited Items</h2>
              <p className="text-gray-600 mb-4">The following items are prohibited from storage:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Hazardous, flammable, or explosive materials</li>
                <li>Perishable food items</li>
                <li>Live animals or plants</li>
                <li>Illegal items or substances</li>
                <li>Items with strong odors</li>
                <li>Firearms, ammunition, or weapons</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Access and Security</h2>
              <p className="text-gray-600 mb-4">
                Gate access is available from 6:00 AM to 10:00 PM daily. Tenants are responsible for securing their units with their own locks. While we maintain security measures, we are not responsible for theft or damage to stored items.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                Hughestown Self-Storage's liability is limited to the actual value of stored items, not to exceed $500 per unit unless additional insurance is purchased. We are not liable for consequential or incidental damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Default and Lien Rights</h2>
              <p className="text-gray-600 mb-4">
                If rent is unpaid for 30 days or more, we may deny access to the unit and exercise lien rights according to Pennsylvania law, including the right to sell stored property to satisfy unpaid charges.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For questions regarding these terms, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  Hughestown Self-Storage<br />
                  133 New Street<br />
                  Hughestown, PA 18640<br />
                  Phone: (570) 362-6150<br />
                  Email: info@hughestownstorage.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}