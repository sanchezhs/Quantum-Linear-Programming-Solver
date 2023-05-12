export function NotFound() {

    const pages = [
        {name: 'Home', url: '/'},
        {name: 'Solver', url: '/solver'},
        {name: 'File', url: '/files'},
    ]

  return (
    <>
        <section id="dropzone-section" className="container">
            <div id="not-found-error">
            <h3 >
                404 <small className="text-muted">Page not found</small>
            </h3>
            <p >
                The page you are looking for does not exist.
            </p>
            </div>
        </section>
    </>
  )
}