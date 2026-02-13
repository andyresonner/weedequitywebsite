// assets/js/authNav.js
(function () {
  if (!window.WE || !window.WE.sb) return;
  const sb = window.WE.sb;

  const els = {
    login: document.getElementById("navLogin"),
    logout: document.getElementById("navLogout"),
    loginMobile: document.getElementById("navLoginMobile"),
    logoutMobile: document.getElementById("navLogoutMobile"),
  };

  async function refreshNav() {
    const { data } = await sb.auth.getUser();
    const user = data?.user;

    if (user) {
      if (els.login) { els.login.textContent = "Account"; els.login.href = "dashboard.html"; }
      if (els.logout) els.logout.classList.remove("hidden");

      if (els.loginMobile) { els.loginMobile.textContent = "Account"; els.loginMobile.href = "dashboard.html"; }
      if (els.logoutMobile) els.logoutMobile.classList.remove("hidden");
    } else {
      if (els.login) { els.login.textContent = "Login"; els.login.href = "login.html"; }
      if (els.logout) els.logout.classList.add("hidden");

      if (els.loginMobile) { els.loginMobile.textContent = "Login"; els.loginMobile.href = "login.html"; }
      if (els.logoutMobile) els.logoutMobile.classList.add("hidden");
    }
  }

  if (els.logout) {
    els.logout.addEventListener("click", async () => {
      await sb.auth.signOut();
      await refreshNav();
    });
  }

  if (els.logoutMobile) {
    els.logoutMobile.addEventListener("click", async () => {
      await sb.auth.signOut();
      await refreshNav();
    });
  }

  sb.auth.onAuthStateChange(() => refreshNav());
  refreshNav();
})();
