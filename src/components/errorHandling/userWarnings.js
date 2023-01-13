class UserWarning {
  constructor(showWarning, errorHeader, description) {
    this.showWarning = showWarning;
    this.header = errorHeader;
    this.description = description;
  }
}

function initWarning() {
  return new UserWarning(false, "", "");
}

function terrainNotPickedWarning() {
  return new UserWarning(true, "Natural 1!", "Vælg et terræn, du søger i.");
}

function inputEmptyWarning() {
  return new UserWarning(true, "Input tomt!", "Indtast din DC.");
}

function inputBelowMinimumWarning() {
  return new UserWarning(
    true,
    "Input for lavt!",
    "Du finder desværre ingen planter."
  );
}

export {
  initWarning,
  terrainNotPickedWarning,
  inputEmptyWarning,
  inputBelowMinimumWarning,
};
