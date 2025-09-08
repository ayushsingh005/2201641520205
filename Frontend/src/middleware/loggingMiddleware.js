const logger = []

function log(message, payload) {
  logger.push({ message, payload, timestamp: Date.now() })
}

export { log, logger }
