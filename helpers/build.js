
import chalk from 'chalk';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

process.env.NODE_ENV = 'production webpack';

console.log(chalk.blue('Preparing deployable contents(minified bundle) for production build. This will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    // Fatal error. Stop here.
    console.log(chalk.red(err));
    return 1;
  } else {
    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
      return jsonStats.errors.map(error => console.log(chalk.red(error)));
    }

    if (jsonStats.hasWarnings) {
      console.log(chalk.yellow('Webpack generated the following warnings: '));
      jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
    }
    console.log(`Webpack stats: ${stats}`);
    console.log(chalk.green('Your app has been built for production and to /dist'));
    return 0;
  }
});
