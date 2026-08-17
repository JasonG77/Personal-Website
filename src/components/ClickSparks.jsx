import { useEffect, useState } from "react";

const SPARK_COLORS = ["#eaf4ff", "#8ab4f8", "#5b8fd4"];
const SPARKS_PER_CLICK = 9;

let nextId = 0;

export const ClickSparks = () => {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const handleClick = (event) => {
      if (event.button !== 0) return;

      const sparks = Array.from({ length: SPARKS_PER_CLICK }, () => {
        const angle = Math.random() * 360;
        const distance = 26 + Math.random() * 46;
        return {
          id: nextId++,
          rotate: angle,
          distance,
          length: 6 + Math.random() * 10,
          color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
          duration: 0.35 + Math.random() * 0.3,
        };
      });

      const burstId = nextId++;
      setBursts((current) => [...current, { id: burstId, x: event.clientX, y: event.clientY, sparks }]);

      window.setTimeout(() => {
        setBursts((current) => current.filter((burst) => burst.id !== burstId));
      }, 750);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="click-sparks-layer" aria-hidden="true">
      {bursts.map((burst) => (
        <div key={burst.id} className="click-spark-burst" style={{ left: burst.x, top: burst.y }}>
          {burst.sparks.map((spark) => (
            <span
              key={spark.id}
              className="click-spark"
              style={{
                width: spark.length,
                background: spark.color,
                boxShadow: `0 0 5px 1px ${spark.color}`,
                animationDuration: spark.duration + "s",
                "--spark-rotate": spark.rotate + "deg",
                "--spark-distance": spark.distance + "px",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
