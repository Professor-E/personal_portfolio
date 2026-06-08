// TODO: Implement footer with social links, copyright, and contact info
export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-6 text-center text-sm text-[var(--text-secondary)]">
      <p>© {new Date().getFullYear()} Dominik Grzeszczak. All rights reserved.</p>
    </footer>
  );
}
