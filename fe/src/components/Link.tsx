function Link({ href, children }: { href: string; children: JSX.Element | null }) {
  function onClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    // prevent full page reload
    event.preventDefault();
    // update url
    window.history.pushState({}, '', href);

    // communicate to Routes that URL has changed
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  }

  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
}

export default Link;
