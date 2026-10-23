import { httpResource } from '@angular/common/http';
import { Service, computed } from '@angular/core';

@Service()
export class GithubService {
  private readonly repoResource = httpResource<{ stargazers_count: number }>(
    () => 'https://api.github.com/repos/gridatek/semantic-components',
  );

  // A failed request (GitHub's rate limit: 403) has no value — reading it
  // would throw: no count, then.
  readonly starCount = computed(() =>
    this.repoResource.hasValue()
      ? this.repoResource.value().stargazers_count
      : 0,
  );
}
