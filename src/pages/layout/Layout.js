import React, { Suspense, useEffect } from 'react'
import Navbar from 'components/navbar/Navbar';
import Footer from 'components/footer/Footer';
import Routers from './Routers';
import Loading from 'components/loading/Loading';

export default function Layout() {
    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
      }, []);

    return (
        <>
            <Navbar />
            <Suspense fallback={<Loading />}>
                <main>
                    <Routers />
                </main>
            </Suspense>
            <Footer />
        </>
    )
}
