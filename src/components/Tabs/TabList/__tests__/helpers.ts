import userEvent from "@testing-library/user-event";

export const pressArrowRight = async () => {
  const user = userEvent.setup();
  await user.keyboard("{ArrowRight}");
};

export const pressArrowLeft = async () => {
  const user = userEvent.setup();
  await user.keyboard("{ArrowLeft}");
};

export const pressHome = async () => {
  const user = userEvent.setup();
  await user.keyboard("{Home}");
};

export const pressEnd = async () => {
  const user = userEvent.setup();
  await user.keyboard("{End}");
};
