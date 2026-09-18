export default function SizeGuidePage() {
  return (
    <div className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 shadow-xs border border-charcoal/5">
        <h1 className="font-serif text-4xl text-charcoal mb-4 text-center">Ring Size Guide</h1>
        <p className="text-center text-charcoal/60 mb-12 text-sm max-w-md mx-auto leading-relaxed">
          Use our international ring size conversion chart to find your perfect fit.
        </p>

        <div className="overflow-x-auto border border-charcoal/10 rounded-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-charcoal/5 border-b border-charcoal/10 uppercase tracking-widest text-[10px]">
              <tr>
                <th className="py-4 px-6 font-medium">India / Japan</th>
                <th className="py-4 px-6 font-medium">US / Canada</th>
                <th className="py-4 px-6 font-medium">UK / Australia</th>
                <th className="py-4 px-6 font-medium">Inside Diameter (mm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5 text-charcoal/80">
              <tr className="hover:bg-black/5 transition-colors">
                <td className="py-4 px-6 font-medium text-charcoal">10</td>
                <td className="py-4 px-6">5 1/4</td>
                <td className="py-4 px-6">K 1/2</td>
                <td className="py-4 px-6">15.9</td>
              </tr>
              <tr className="hover:bg-black/5 transition-colors">
                <td className="py-4 px-6 font-medium text-charcoal">11</td>
                <td className="py-4 px-6">5 3/4</td>
                <td className="py-4 px-6">L 1/4</td>
                <td className="py-4 px-6">16.2</td>
              </tr>
              <tr className="hover:bg-black/5 transition-colors">
                <td className="py-4 px-6 font-medium text-charcoal">12</td>
                <td className="py-4 px-6">6</td>
                <td className="py-4 px-6">M</td>
                <td className="py-4 px-6">16.5</td>
              </tr>
              <tr className="hover:bg-black/5 transition-colors">
                <td className="py-4 px-6 font-medium text-charcoal">13</td>
                <td className="py-4 px-6">6 1/2</td>
                <td className="py-4 px-6">N</td>
                <td className="py-4 px-6">16.9</td>
              </tr>
              <tr className="hover:bg-black/5 transition-colors">
                <td className="py-4 px-6 font-medium text-charcoal">14</td>
                <td className="py-4 px-6">7</td>
                <td className="py-4 px-6">O</td>
                <td className="py-4 px-6">17.3</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 bg-charcoal/5 p-8 text-sm text-charcoal/80 rounded-sm">
          <h3 className="font-serif text-xl mb-4 text-charcoal">How to measure:</h3>
          <ol className="list-decimal pl-5 space-y-3 leading-relaxed">
            <li>Wrap a piece of string or paper around the base of your finger.</li>
            <li>Mark the point where the ends meet with a pen.</li>
            <li>Measure the string or paper with a ruler (mm).</li>
            <li>Pick the closest measurement on the ring size chart to find your ring size.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
