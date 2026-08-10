import React, { useMemo, useState } from 'react';
import { SemesterEvolution } from '@/types';

interface EvolutionChartProps {
  data: SemesterEvolution[];
}

const series: { key: keyof Omit<SemesterEvolution, 'semester'>; label: string; color: string }[] = [
  { key: 'projetos', label: 'Projetos', color: '#2563EB' },
  { key: 'cursos', label: 'Cursos', color: '#38BDF8' },
  { key: 'certificados', label: 'Certificados', color: '#A5B4FC' },
];

export function EvolutionChart({ data }: EvolutionChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const max = useMemo(
    () => Math.max(1, ...data.map((d) => d.projetos + d.cursos + d.certificados)),
    [data]
  );

  const chartHeight = 180;
  const barWidth = 22;
  const gap = 28;
  const width = data.length * (barWidth + gap) + gap;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {series.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-xs text-ink-soft">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${chartHeight + 40}`}
          width="100%"
          height={chartHeight + 40}
          role="img"
          aria-label="Gráfico de evolução acadêmica por semestre"
          className="min-w-[420px]"
        >
          {[0.25, 0.5, 0.75, 1].map((frac) => (
            <line
              key={frac}
              x1={0}
              x2={width}
              y1={chartHeight - chartHeight * frac}
              y2={chartHeight - chartHeight * frac}
              stroke="#E2E8F0"
              strokeDasharray="4 4"
            />
          ))}

          {data.map((d, i) => {
            const total = d.projetos + d.cursos + d.certificados;
            const x = gap + i * (barWidth + gap);
            let yOffset = chartHeight;
            const segments = series.map((s) => {
              const value = d[s.key];
              const h = (value / max) * chartHeight;
              yOffset -= h;
              return { ...s, y: yOffset, h, value };
            });

            return (
              <g
                key={d.semester}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="cursor-pointer"
              >
                {segments.map((seg) => (
                  <rect
                    key={seg.key}
                    x={x}
                    y={seg.y}
                    width={barWidth}
                    height={Math.max(seg.h, seg.value > 0 ? 2 : 0)}
                    fill={seg.color}
                    rx={3}
                    opacity={hover === null || hover === i ? 1 : 0.4}
                  />
                ))}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#64748B"
                >
                  {d.semester}
                </text>
                {hover === i && (
                  <g>
                    <rect
                      x={x - 22}
                      y={chartHeight - (total / max) * chartHeight - 34}
                      width={88}
                      height={28}
                      rx={6}
                      fill="#1E293B"
                    />
                    <text
                      x={x + 22}
                      y={chartHeight - (total / max) * chartHeight - 16}
                      textAnchor="middle"
                      fontSize="11"
                      fill="white"
                      fontWeight={600}
                    >
                      {total} no total
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
