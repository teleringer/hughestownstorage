'use client';

export default function BlogHero() {
  return (
    <section 
      className="relative py-32 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=Modern%20storage%20facility%20with%20professional%20blog%20workspace%2C%20clean%20office%20environment%20with%20filing%20cabinets%20and%20organized%20storage%20solutions%2C%20bright%20lighting%2C%20professional%20atmosphere%2C%20business%20setting%20with%20storage%20units%20in%20background&width=1200&height=600&seq=vault-hero&orientation=landscape')`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          The Vault
        </h1>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Your trusted resource for storage tips, organization strategies, and industry insights. 
          Discover expert advice to make the most of your storage experience.
        </p>
      </div>
    </section>
  );
}