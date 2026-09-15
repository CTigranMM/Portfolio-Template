import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.jsx");const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport2_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=959eed52";
import { translations } from "/src/translations.js";
var _jsxFileName = "C:/Users/Gurt/Downloads/Portfolio/Website/src/App.jsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=959eed52";
var _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
// Dedicated VideoPlayer component ensuring smooth HTML5 playback
function VideoPlayer({ src, title }) {
	_s();
	const videoRef = useRef(null);
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.defaultMuted = true;
			videoRef.current.muted = true;
			videoRef.current.play().catch((err) => {
				console.warn("Autoplay prevented by browser:", err);
			});
		}
	}, [src]);
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "video-wrapper",
		children: /* @__PURE__ */ _jsxDEV("video", {
			ref: videoRef,
			autoPlay: true,
			loop: true,
			muted: true,
			playsInline: true,
			controls: true,
			preload: "auto",
			className: "video-element",
			title,
			children: [/* @__PURE__ */ _jsxDEV("source", {
				src,
				type: "video/mp4"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 9
			}, this), "Votre navigateur ne prend pas en charge les vidéos HTML5."]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 20,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 19,
		columnNumber: 5
	}, this);
}
_s(VideoPlayer, "PP/hyxAFabS28SghyD38fzG7RnU=");
_c = VideoPlayer;
// Component for images with skeleton loading state
function ImgWithSkeleton({ src, alt, className, wrapperClassName, fallbackImage, style }) {
	_s2();
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	return /* @__PURE__ */ _jsxDEV("div", {
		className: `${wrapperClassName || ""} ${loaded || error ? "" : "skeleton-loader"}`,
		children: /* @__PURE__ */ _jsxDEV("img", {
			src: error && fallbackImage ? fallbackImage : src,
			alt,
			className,
			style: {
				...style,
				opacity: loaded || error ? 1 : 0,
				transition: "opacity 0.3s ease"
			},
			onLoad: () => setLoaded(true),
			onError: () => {
				if (!error && fallbackImage) {
					setError(true);
				} else {
					setLoaded(true);
				}
			}
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 45,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 44,
		columnNumber: 5
	}, this);
}
_s2(ImgWithSkeleton, "B9hQxtsnxFRObpfL1Nsw2NbnmXo=");
_c2 = ImgWithSkeleton;
export default function App() {
	_s3();
	const [theme, setTheme] = useState(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("theme");
			if (saved) return saved;
			return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		return "dark";
	});
	const [activeProject, setActiveProject] = useState(null);
	const [activeExperience, setActiveExperience] = useState(null);
	const savedScrollPos = useRef(0);
	const openProject = (project) => {
		savedScrollPos.current = window.scrollY;
		setActiveProject(project);
	};
	const openExperience = (exp) => {
		savedScrollPos.current = window.scrollY;
		setActiveExperience(exp);
	};
	const closeShowcase = () => {
		setActiveProject(null);
		setActiveExperience(null