const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto py-24 px-6">
      <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>

      <p className="text-neutral-600 mb-4">
        We respect your privacy. This policy explains how PolicyPulse collects,
        uses, and protects your data.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">What we collect</h2>
      <ul className="list-disc ml-6 text-neutral-600 space-y-2">
        <li>Email address (for login)</li>
        <li>Submitted policy text or URLs</li>
        <li>Generated reports</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">What we don’t do</h2>
      <ul className="list-disc ml-6 text-neutral-600 space-y-2">
        <li>No selling data</li>
        <li>No ads tracking</li>
        <li>No third-party sharing</li>
      </ul>

      <p className="text-neutral-500 mt-10 text-sm">
        Last updated: {new Date().toDateString()}
      </p>
    </div>
  );
};

export default Privacy;