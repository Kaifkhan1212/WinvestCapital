/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertCircle, ShieldAlert, Award } from 'lucide-react';

export default function LegalDisclaimer() {
  return (
    <section className="relative py-16 bg-[#050807] border-t border-slate-900 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 rounded-3xl bg-slate-900/10 border border-slate-850 max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 text-slate-400 font-display font-semibold text-sm mb-4">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>Important Notice &amp; Legal Disclaimers</span>
          </div>

          <div className="text-[11px] sm:text-xs text-slate-500 space-y-3 leading-relaxed">
            <p>
              <strong>SEBI RA Registration details:</strong> Registered with Securities and Exchange Board of India (SEBI) as a Research Analyst under Registration No. INH000025124 in the name of SHOEB ABDUL RAHIM SHAIKH (Proprietor: Winvest Capitals). Registered office address: 401-A 4th Floor Gurudatta Plaza, Beside HP Petrol Pump, Ganesh Colony Road, Jalgaon, Maharashtra - 425001. Contact No: +91-9579557272.
            </p>
            <p>
              <strong>Market Risk Disclaimer:</strong> Investments in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. All recommendation logs published on this platform are for analytical, research, and study purposes only and do not constitute an assurance or guaranteed returns.
            </p>
            <p>
              <strong>Past Performance:</strong> Past performance metrics and historical accuracy figures do not reflect or guarantee future outcomes. Trading equities and derivatives (options) involve substantial capital risks and may result in partial or complete loss of funds. Subscribing clients must trade according to their personal risk profile and consult standard legal documentation prior to execution.
            </p>
            <p>
              <strong>Regulatory Certification:</strong> The lead researcher holds mandatory NISM certifications as prescribed under SEBI (Research Analyst) Regulations, 2014. No material conflict of interest exists between the proprietor, the firm, and the analyzed securities, save as declared in periodic client communications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
