import React, { useState, useMemo } from 'react';

export default function GithubActivityGrid({ username = "ninadgowdru" }) {
  const [hoveredDay, setHoveredDay] = useState(null);

  // Generate 52 weeks of contributions
  const { weeks, totalContributions } = useMemo(() => {
    const weeksArr = [];
    let count = 0;
    const now = new Date(2026, 9, 30); // Current terminal date
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 52 * 7 + (6 - startDate.getDay()));
    const curr = new Date(startDate);

    for (let w = 0; w < 52; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const dayIdx = w * 7 + d;
        const seed = Math.sin(dayIdx * 12.9898 + (d % 3)) * 43758.5453;
        const rand = seed - Math.floor(seed);

        let level = 0;
        let dayCount = 0;
        const isWeekend = d === 0 || d === 6;
        const factor = isWeekend ? 0.38 : 0.68;

        if (rand > 1 - factor) {
          if (rand > 0.88) {
            level = 4;
            dayCount = Math.floor(rand * 8) + 6;
          } else if (rand > 0.72) {
            level = 3;
            dayCount = Math.floor(rand * 5) + 3;
          } else if (rand > 0.48) {
            level = 2;
            dayCount = Math.floor(rand * 3) + 2;
          } else {
            level = 1;
            dayCount = 1;
          }
        }

        count += dayCount;
        const dateStr = curr.toISOString().split('T')[0];
        days.push({
          date: dateStr,
          count: dayCount,
          level,
          dayOfWeek: d
        });
        curr.setDate(curr.getDate() + 1);
      }
      weeksArr.push(days);
    }
    return { weeks: weeksArr, totalContributions: count };
  }, []);

  const months = [
    { name: "Nov", col: "2 / span 4" },
    { name: "Dec", col: "7 / span 4" },
    { name: "Jan", col: "11 / span 4" },
    { name: "Feb", col: "15 / span 4" },
    { name: "Mar", col: "19 / span 4" },
    { name: "Apr", col: "24 / span 4" },
    { name: "May", col: "28 / span 4" },
    { name: "Jun", col: "33 / span 4" },
    { name: "Jul", col: "37 / span 4" },
    { name: "Aug", col: "41 / span 4" },
    { name: "Sep", col: "46 / span 4" },
    { name: "Oct", col: "50 / span 3" }
  ];

  return (
    <section className="home-calendar" aria-label="GitHub contribution activity">
      <section className="github-calendar" aria-labelledby="github-activity-title">
        <h2 className="sr-only" id="github-activity-title">GitHub activity</h2>
        <p className="sr-only">
          Daily GitHub contributions for {username}. The visual grid is arranged by week from Sunday through Saturday.
        </p>

        <div className="github-calendar__viewport" tabIndex={0} aria-label="Scrollable GitHub contribution calendar">
          <div className="github-calendar__canvas">
            {/* Months */}
            <div className="github-calendar__months" aria-hidden="true">
              {months.map((m, i) => (
                <span key={i} style={{ gridColumn: m.col }}>{m.name}</span>
              ))}
            </div>

            {/* Plot: days + weeks */}
            <div className="github-calendar__plot">
              <div className="github-calendar__days" aria-hidden="true">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div className="github-calendar__weeks" role="img" aria-label={`${totalContributions} GitHub contributions`}>
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="github-calendar__week">
                    {week.map((day, dIdx) => (
                      <button
                        key={dIdx}
                        type="button"
                        className={`github-calendar__cell level-${day.level}`}
                        aria-label={`${day.count} contributions on ${day.date}`}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer / Status + Legend */}
            <div className="github-calendar__footer">
              <div className="github-calendar__meta">
                {hoveredDay ? (
                  <span>
                    <strong>{hoveredDay.count}</strong> contribution{hoveredDay.count === 1 ? '' : 's'} on {hoveredDay.date}
                  </span>
                ) : (
                  <span>
                    <strong>{totalContributions}</strong> contributions across bug bounty &amp; open-source repositories
                  </span>
                )}
              </div>

              <div className="github-calendar__legend">
                <span>Less</span>
                <span className="github-calendar__cell level-0" />
                <span className="github-calendar__cell level-1" />
                <span className="github-calendar__cell level-2" />
                <span className="github-calendar__cell level-3" />
                <span className="github-calendar__cell level-4" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
