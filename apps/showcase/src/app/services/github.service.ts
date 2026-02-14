import { httpResource } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly repoResource = httpResource<{ stargazers_count: number }>(
    () => 'https://api.github.com/repos/gridatek/semantic-components',
  );

  readonly starCount = computed(
    () => this.repoResource.value()?.stargazers_count ?? 0,
  );
}
