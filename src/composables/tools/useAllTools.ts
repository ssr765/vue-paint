import { useFreehand } from './useFreehand/useFreehand'
import { useLine } from './useLine/useLine'
import { useArrow } from './useArrow/useArrow'
import { useRectangle } from './useRectangle/useRectangle'
import { useCrop } from './useCrop/useCrop'
import { useBackground } from './useBackground/useBackground'
import { useTextarea } from './useTextarea/useTextarea'
import { useEraser } from './useEraser/useEraser'
import { useMove, type UseMoveOptions } from './useMove/useMove'

export interface Options extends UseMoveOptions {
  background?: Blob | Promise<Blob>
}

export function useAllTools(options?: Options) {
  const tools = [useFreehand(), useLine(), useArrow(), useRectangle(), useTextarea(), useCrop(), useEraser(), useMove(options)]
  if (options?.background) {
    return { tools: [useBackground({ blob: options?.background }), ...tools] }
  }
  return { tools }
}
