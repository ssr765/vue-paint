import type { DrawEvent, ToolComposable } from "@/types"
import { shapeSvgComponent } from "@/utils/shapeSvgComponent"
import { h } from "vue"

export interface Line {
    type: "line"
    x1: number
    y1: number
    x2: number
    y2: number
    thickness: number
    color: string
}

export function useLine(): ToolComposable<Line> {
    const type = "line"

    function onDraw({ settings, posStart, x, y, left, top}: DrawEvent): Line {
        return {
            type,
            x1: posStart.x - left.value,
            y1: posStart.y - top.value,
            x2: x.value,
            y2: y.value,
            thickness: settings.thickness,
            color: settings.color
        }
    }

    const shapeSvg = shapeSvgComponent<Line>(line => h('line', {
        x1: line.x1,
        y1: line.y1,
        x2: line.x2,
        y2: line.y2,
        stroke: line.color,
        'stroke-width': line.thickness
    }))

    const svgStyle = `
        line {
            stroke-linecap: round;
            stroke-linejoin: round;
            fill-opacity: 0;
        }
    `

    return { type, onDraw, shapeSvg, svgStyle }
}