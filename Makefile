build:
	npx tsc

test:
	npm run test

clean:
	rm -rf ./dist

publish: test clean build
	npm publish

