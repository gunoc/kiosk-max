export function Link({ href, children }: { href: string; children: JSX.Element | null }) {
  function onClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    window.history.pushState({}, '', href);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  }

  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
}
