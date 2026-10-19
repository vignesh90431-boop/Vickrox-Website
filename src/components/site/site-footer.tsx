export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="wrap site-footer">
      <div>
        <div className="footerbrand">
          VICK<span>ROX</span>
        </div>
        <div className="footer-tagline">Build · Design · Grow</div>
      </div>
      <nav className="footerlinks" aria-label="Footer navigation">
        <a href="#services">Services</a>
        <a href="#why">About</a>
        <a href="mailto:vickyvigneshcoc99@gmail.com">Email</a>
        <a href="tel:+919043104853">Call</a>
      </nav>
      <div>© {year} VICKROX. All rights reserved.</div>
    </footer>
  )
}
