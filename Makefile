build:
	rm -fr ./dist
	npx tsc

test:

	npm run test

publish: test build
	npm publish

