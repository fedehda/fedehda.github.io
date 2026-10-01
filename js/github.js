/**
 * GitHub API Integration with Local Storage Caching and Graceful Fallback
 * Fetches repository statistics, star counts, and language metadata.
 */

const GITHUB_USERNAME = 'fedehda';
const CACHE_KEY = `github_portfolio_cache_${GITHUB_USERNAME}`;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function initGitHubSync() {
  try {
    const cachedData = getCachedData();
    if (cachedData) {
      applyDataToDOM(cachedData);
      return;
    }

    const [userData, reposData] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`).then(r => r.ok ? r.json() : null),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`).then(r => r.ok ? r.json() : null)
    ]);

    if (userData || reposData) {
      const payload = {
        timestamp: Date.now(),
        user: userData,
        repos: reposData || []
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
      applyDataToDOM(payload);
    }
  } catch (error) {
    console.info('GitHub API offline or rate-limited; using static fallback data.', error);
  }
}

function getCachedData() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function applyDataToDOM(data) {
  if (data.user && data.user.public_repos) {
    const countEl = document.getElementById('hero-repo-count');
    if (countEl) {
      countEl.textContent = `+${data.user.public_repos}`;
    }
  }

  if (Array.isArray(data.repos)) {
    data.repos.forEach(repo => {
      const card = document.querySelector(`[data-repo="${repo.name}"]`);
      if (card) {
        const starsEl = card.querySelector('.repo-stars');
        const forksEl = card.querySelector('.repo-forks');
        const dateEl = card.querySelector('.repo-date');

        if (starsEl) starsEl.textContent = repo.stargazers_count;
        if (forksEl) forksEl.textContent = repo.forks_count;
        if (dateEl && repo.updated_at) {
          const year = new Date(repo.updated_at).getFullYear();
          dateEl.textContent = `Act: ${year}`;
        }
      }
    });
  }
}
