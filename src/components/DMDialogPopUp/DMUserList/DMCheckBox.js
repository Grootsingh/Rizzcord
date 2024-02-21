function DMCheckBox({ username, isDMList, updateDMList }) {
  return (
    <>
      <label className="sr-only" htmlFor={username}>
        {username}
      </label>
      <input
        type="checkbox"
        name="List of friends for DM Group"
        id={username}
        value={username}
        checked={isDMList.get(username) === true}
        onChange={() => {
          updateDMList(!Boolean(isDMList.get(username)), username);
        }}
        onKeyDown={(event) => {
          if (event.code === "Enter") {
            updateDMList(!Boolean(isDMList.get(username)), username);
          }
        }}
        className="h-[22px] w-[22px] appearance-none rounded-lg outline-none focus-visible:ring  focus-visible:ring-theme-Brand"
      />
    </>
  );
}

export default DMCheckBox;
