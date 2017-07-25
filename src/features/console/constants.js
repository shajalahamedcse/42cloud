import Overview from 'features/overview/components/Overview';
import Instance from 'features/comnet/instance/components/Instance';
import Image from 'features/comnet/image/components/Image';
import Volume from 'features/volume/components/Volume';
import SSH from 'features/security/ssh/components/SSH';

export const CONSOLE_ROUTES = {
  overview: Overview,
  instance: Instance,
  image: Image,
  volume: Volume,
  ssh: SSH
};