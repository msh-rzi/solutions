export type ExpertiseCategoryKey = 'frontend' | 'backend' | 'saas';

export type ExpertiseItem = {
  approach: string;
  problem: string;
  why: string;
};

export type ExpertiseCategory = {
  categoryKey: ExpertiseCategoryKey;
  problems: readonly ExpertiseItem[];
};
