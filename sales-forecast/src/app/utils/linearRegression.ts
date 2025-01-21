import * as tf from '@tensorflow/tfjs'

export async function trainLinearRegressionModel(dates: string[], sales: number[]): Promise<tf.LayersModel> {
  const xs = tf.tensor2d(dates.map((_, i) => [i]), [dates.length, 1])
  const ys = tf.tensor2d(sales, [sales.length, 1])

  const model = tf.sequential()
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }))

  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })

  await model.fit(xs, ys, { epochs: 100 })

  return model
}

export function predictSales(model: tf.LayersModel, dates: string[]): number[] {
  const xs = tf.tensor2d(dates.map((_, i) => [i]), [dates.length, 1])
  const predictions = model.predict(xs) as tf.Tensor
  return Array.from(predictions.dataSync())
}

