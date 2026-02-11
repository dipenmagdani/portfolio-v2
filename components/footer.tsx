import { FiMail, FiPhone } from 'react-icons/fi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="py-24 md:py-32 px-6 bg-black text-white border-t border-neutral-900 relative overflow-hidden">
            {/* Footer atmospheric glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-neutral-900/50 to-transparent pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-fuchsia-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-20 relative z-10">

                <div className="space-y-8 md:space-y-12">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-heading font-bold tracking-tighter leading-none">
                        Let&apos;s create<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-600">something iconic.</span>
                    </h2>
                    <p className="text-neutral-400 max-w-sm text-base md:text-lg font-light">
                        Open for freelance projects and full-time opportunities.
                    </p>

                    <div className="flex flex-col gap-6 pt-4">
                        <a href="mailto:dipenmagdani@gmail.com" className="group flex items-center gap-6 text-neutral-300 hover:text-white transition-colors">
                            <div className="p-3 md:p-4 rounded-full bg-neutral-900 group-hover:bg-white group-hover:text-black transition-colors border border-neutral-800 group-hover:scale-110 duration-300">
                                <FiMail className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="text-lg md:text-2xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300 break-all">dipenmagdani@gmail.com</span>
                        </a>
                </div>

                <div className="flex gap-4 md:gap-6">
                    <a href="https://linkedin.com/in/dipenmagdani" target="_blank" rel="noopener noreferrer" className="p-4 md:p-6 bg-neutral-900 rounded-full hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-2 border border-neutral-800" aria-label="LinkedIn">
                        <FaLinkedinIn className="w-6 h-6 md:w-8 md:h-8" />
                    </a>
                    <a href="https://github.com/dipenmagdani" target="_blank" rel="noopener noreferrer" className="p-4 md:p-6 bg-neutral-900 rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-2 border border-neutral-800" aria-label="GitHub">
                        <FaGithub className="w-6 h-6 md:w-8 md:h-8" />
                    </a>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-20 md:mt-32 pt-8 border-t border-neutral-900 text-center md:text-left text-neutral-600 text-xs md:text-sm flex flex-col md:flex-row justify-between items-center font-mono uppercase tracking-widest relative z-10 gap-4">
                <span>© {currentYear} Dipen Magdani</span>
                <span className="hidden md:inline">Built with Next.js 15 & Tailwind</span>
            </div>
        </footer>
    );
}
