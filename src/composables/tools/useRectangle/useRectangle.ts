import type { DrawEvent, Tool } from '@/types'
import { shapeSvgComponent } from '@/utils/shapeSvgComponent'
import { h } from 'vue'

export interface Rectangle {
  type: 'rectangle'
  x: number
  y: number
  height: number
  width: number
  thickness: number
  color: string
}

export function useRectangle(): Tool<Rectangle> {
  const type = 'rectangle'

  const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m0 160H40V56h176z"/></svg>`

  function onDraw({ settings, minX, minY, maxX, maxY }: DrawEvent): Rectangle {
    return {
      type,
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
      thickness: settings.thickness,
      color: settings.color
    }
  }

  const shapeSvg = shapeSvgComponent<Rectangle>((rectangle) =>
    h('rect', {
      x: rectangle.x,
      y: rectangle.y,
      width: rectangle.width,
      height: rectangle.height,
      stroke: rectangle.color,
      'stroke-width': rectangle.thickness
    })
  )

  const svgStyle = `
        rect {
            stroke-linecap: round;
            stroke-linejoin: round;
            fill-opacity: 0;
        }
    `

  return { type, icon, onDraw, shapeSvg, svgStyle }
}