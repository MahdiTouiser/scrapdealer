const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Make Metro watch your workspace root (for shared packages)
config.watchFolders = [workspaceRoot];

// Make Metro resolve node_modules from both project and workspace
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules'), path.resolve(workspaceRoot, 'node_modules')];
config.resolver.disableHierarchicalLookup = true;

// Add extra file extensions
config.resolver.sourceExts.push('cjs');

module.exports = config;
