export const steps = {
  // 진행될 step의 순서, Funnel 컴포넌트 안에 Step 컴포넌트 순서는 상관 없음
  order: ['hashTags', 'introduction', 'careers'],
  hasPrev(step: string): boolean {
    return this.getIndex(step) !== 0;
  },
  hasNext(step: string): boolean {
    return this.getIndex(step) + 1 < this.order.length;
  },
  getNextStep(step: string): string | null {
    const currentIndex = this.getIndex(step);
    if (this.hasNext(step)) {
      return this.order[currentIndex + 1];
    }
    return null;
  },
  getPrevStep(step: string): string | null {
    const currentIndex = this.getIndex(step);
    if (this.hasPrev(step)) {
      return this.order[currentIndex - 1];
    }
    return null;
  },
  getIndex(targetStep: string): number {
    return this.order.findIndex((step) => step === targetStep);
  }
};
