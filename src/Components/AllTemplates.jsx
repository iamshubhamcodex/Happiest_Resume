import { lazy, Suspense } from "react";
const Template1 = lazy(() => import("../Templates/Template1"));
const Template2 = lazy(() => import("../Templates/Template2"));
const Template3 = lazy(() => import("../Templates/Template3"));

export default function AllTemplate({ full, val }) {
  switch (val) {
    case 1:
      return (
        <Suspense fallback={<div className="loadingTemplate"></div>}>
          <Template1 full={full} />
        </Suspense>
      );
    case 2:
      return (
        <Suspense fallback={<div className="loadingTemplate"></div>}>
          <Template2 full={full} />
        </Suspense>
      );
    case 3:
      return (
        <Suspense fallback={<div className="loadingTemplate"></div>}>
          <Template3 full={full} />
        </Suspense>
      );
    default:
      return (
        <p className="text-muted text-center">
          Choose Template before You can start
        </p>
      );
      break;
  }
}
