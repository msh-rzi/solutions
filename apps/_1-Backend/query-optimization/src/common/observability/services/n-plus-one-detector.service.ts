import { Injectable } from '@nestjs/common';

export type NPlusOneSignal = {
  severity: 'info' | 'warning';
  message: string;
};

type DetectionInput = {
  strategy: string;
  queryCount: number;
  usersReturned: number;
};

@Injectable()
export class NPlusOneDetectorService {
  detect({ strategy, queryCount, usersReturned }: DetectionInput): NPlusOneSignal[] {
    const signals: NPlusOneSignal[] = [];

    if (usersReturned > 0 && queryCount >= usersReturned + 1) {
      signals.push({
        severity: 'warning',
        message: `Potential N+1 pattern detected for "${strategy}" (query count scales with returned users).`,
      });
    }

    if (queryCount >= 50) {
      signals.push({
        severity: 'warning',
        message: `High per-request SQL query count (${queryCount}). Add query-count SLOs and alerts in production.`,
      });
    }

    if (signals.length === 0) {
      signals.push({
        severity: 'info',
        message: 'No obvious N+1 signal detected for this execution.',
      });
    }

    return signals;
  }
}
