import Overview from 'features/overview/components/Overview';
import Instance from 'features/instance/components/Instance';
import Image from 'features/image/components/Image';
import Volume from 'features/volume/components/Volume';
import keypair from 'features/keypair/components/keypair';

export const CONSOLE_ROUTES = {
  overview: Overview,
  instance: Instance,
  image: Image,
  volume: Volume,
  keypair: keypair
};