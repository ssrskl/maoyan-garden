type Payload = Record<string, any> | undefined

export function track(event: string, payload?: Payload) {
  try {
    // 预留接入：Plausible/Umami/自研
    // window.plausible?.(event, { props: payload })
  } catch {}
}

