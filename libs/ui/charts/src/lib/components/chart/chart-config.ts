/** The charts' settings: `provideSemanticComponents({ charts: { … } })`. */
export interface ScChartsConfig {
  /**
   * Charts mirror themselves when their direction is right to left (a
   * parent's `dir`, read through the CDK's `Directionality`): the categories
   * from the right, the axis beside the plot on the right. An axis's own
   * `reversed` and `orientation` win. Off by default, as in Recharts.
   */
  followDirection?: boolean;
}

declare module '@semantic-components/ui' {
  interface ScConfig {
    charts?: ScChartsConfig;
  }
}
