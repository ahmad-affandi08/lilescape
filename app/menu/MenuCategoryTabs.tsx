"use client";

import { useEffect, useState } from "react";

type CategoryTab = {
  id: string;
  label: string;
};

type MenuCategoryTabsProps = {
  tabs: CategoryTab[];
};

export default function MenuCategoryTabs({ tabs }: MenuCategoryTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");

  useEffect(() => {
    if (tabs.length === 0) {
      return;
    }

    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && tabs.some((tab) => tab.id === hash)) {
        setActiveId(hash);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.5, 0.65],
      }
    );

    tabs.forEach((tab) => {
      const section = document.getElementById(tab.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      observer.disconnect();
    };
  }, [tabs]);

  const onTabClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();

    const section = document.getElementById(targetId);
    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${targetId}`);
    setActiveId(targetId);
  };

  return (
    <div className="sticky top-17.5 z-20 mb-8 overflow-x-auto menu-tabs-scroll rounded-2xl border border-white/30 bg-white/12 p-2 shadow-xl shadow-black/20 backdrop-blur-xl md:top-21">
      <div className="flex min-w-max gap-2">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;

          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              aria-current={isActive ? "true" : undefined}
              onClick={(event) => onTabClick(event, tab.id)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                isActive
                  ? "border-gold/80 bg-gold text-accent shadow-lg shadow-black/25"
                  : "border-white/25 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white hover:text-accent"
              }`}
            >
              {tab.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
