const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouterDOM;

import { AppHeader } from "./cmps/AppHeader.jsx";

import { AboutUs } from "./pages/AboutUs.jsx";
import { BookDetails } from "./pages/BookDetails.jsx";
import { BookEdit } from "./pages/BookEdit.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { HomePage } from "./pages/HomePage.jsx";

export function App() {
	return (
		<Router>
			<section className="app">
				<AppHeader />
				<main className="main-layout">
					<Routes>
						<Route path="/" element={<Navigate to="/home" />} />
						<Route path="/home" element={<HomePage />} />
						<Route path="/about" element={<AboutUs />} />
						<Route path="/book" element={<BookIndex />} />
						{/* <Route path="/book/:bookId" element={<BookDetails />} /> */}
						{/* <Route path="/book/edit" element={<BookEdit />} /> */}
					</Routes>
				</main>
			</section>
		</Router>
	);
}

/**

<section className="app">
    <AppHeader onSetPage={page => setPage(page)} />

    <main className="main-layout">
        {page === 'home' && <Home />}
        {page === 'about' && <About />}
        {page === 'car' && <CarIndex />}
    </main>
</section>
*/
