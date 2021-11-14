// Styles & Animations
import "tailwindcss/tailwind.css";
import "../styles.css";

// Next auth provider V3
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
