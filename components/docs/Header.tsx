export function Header() {
  return (
    <header className="mb-10 flex flex-col items-center">

      <h1 className="mt-12 text-6xl font-extrabold tracking-tighter leading-[1.1] sm:text-7xl lg:text-8xl xl:text-8xl text-center mb-6 font-black">
        The Goodest <br/>
        <span className="text-transparent bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text">
          &nbsp;Boy in Cosmøs&nbsp;
        </span>
      </h1>

      <div className="flex flex-wrap gap-2 justify-center max-w-[28rem] min-h-[3rem]">
        <a
          aria-label="Twitter Follow"
          href="https://twitter.com/pupmos"
          className="h-5"
        >
          <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/pupmos?colorA=2B323B&colorB=1e2329&style=flat&label=Twitter"></img>
        </a>

        <a
          aria-label="Github"
          href="https://github.com/Pupmos"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/github/stars/pupmos?colorA=2B323B&colorB=1e2329&style=flat&label=Github"
          />
        </a>

        {/* https://shields.io/endpoint */}
        {/* <a
          aria-label="Stake"
          href="https://restake.app/juno/junovaloper1ka8v934kgrw6679fs9cuu0kesyl0ljjy2kdtrl"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/badge/dynamic/json?colorA=2B323B&colorB=1e2329&label=Stake&prefix=%24&query=%24.validator.total_usd&url=https%3A%2F%2Fvalidators.cosmos.directory%2Fpupmos%2F"
          />
        </a> */}

        <a
          aria-label="Delegators"
          href="https://restake.app/juno/junovaloper1ka8v934kgrw6679fs9cuu0kesyl0ljjy2kdtrl"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/badge/dynamic/json?colorA=2B323B&colorB=1e2329&style=flat&label=Delegators&query=%24.validator.total_users&url=https%3A%2F%2Fvalidators.cosmos.directory%2Fpupmos%2F"
          />
        </a>
        {/* <a aria-label="Chains" href="https://cosmos.network" className="h-5">
          <img
            alt="Chains"
            src="https://img.shields.io/badge/dynamic/json?label=Chains&query=%24.validator.chains.length&url=https%3A%2F%2Fvalidators.cosmos.directory%2Fpupmos%2F&colorA=2B323B&colorB=1e2329&style=flat"
            />
          </a> */}
          <a aria-label="zoomiez" href="https://cosmos.network" className="h-5">
          <img
            alt="Lovb"
            src="https://img.shields.io/static/v1?label=Zoomiez&message=yesh&colorA=2B323B&colorB=1e2329&style=flat"
          />
          </a>
        <a aria-label="lovb" href="https://cosmos.network" className="h-5">
          <img
            alt="Lovb"
            src="https://img.shields.io/static/v1?label=Lovb&message=u&colorA=2B323B&colorB=1e2329&style=flat"
          />
          </a>
      </div>
    </header>
  );
}
