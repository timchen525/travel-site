# End-to-End Testing with Playwright

This project includes end-to-end tests using Playwright to verify the functionality of the travel site.

## Test Files

- `e2e/about.spec.ts` - Tests for the About page

## Setup

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install chromium
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in headed mode (see browser)

```bash
npm run test:headed
```

### Run tests with UI mode (interactive)

```bash
npm run test:ui
```

## Test Coverage

### About Page Tests

The About page test suite (`e2e/about.spec.ts`) includes the following test cases:

1. **Page Load Tests**
   - Verifies the page loads successfully at `/about` route
   - Checks page title

2. **Content Display Tests**
   - Hero section with "关于我们" heading
   - Mission section with company description
   - Values section with 4 value cards
   - Features section with 6 feature cards
   - Stats section with company statistics
   - Team section with 3 team members
   - CTA section with action buttons

3. **Navigation Tests**
   - Tests navigation from home to about page via header
   - Tests navigation back to home via CTA button
   - Verifies active state of navigation links

4. **Responsive Design Tests**
   - Tests mobile viewport (375x667)
   - Verifies content stacks properly on mobile
   - Checks that all content remains visible

5. **Layout Tests**
   - Verifies header is present and visible
   - Verifies footer is present and visible
   - Checks that all major sections load

## Test Configuration

Playwright configuration is defined in `playwright.config.ts`:

- **Test Directory**: `./e2e`
- **Base URL**: `http://localhost:5173`
- **Browser**: Chromium
- **Web Server**: Automatically starts dev server before tests
- **Reporter**: HTML (generates report in `playwright-report/`)

## Manual Testing

If Playwright browsers are not available, manual testing has been documented in `TESTING.md`. This includes:

- Visual verification screenshots
- Functionality checklist
- Responsive design verification
- Build verification

## Troubleshooting

### Playwright browser not installed

If you see an error about missing browsers, run `npx playwright install chromium` as described in the "Install Playwright Browsers" section above.

### Port already in use

If port 5173 is already in use, stop the running dev server:

```bash
# Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Tests timing out

If tests time out waiting for the server:
- Check that `npm run dev` starts successfully
- Verify port 5173 is accessible
- Try increasing the timeout in `playwright.config.ts`

## Contributing

When adding new pages or features:

1. Create corresponding test file in `e2e/` directory
2. Follow the naming convention: `<page-name>.spec.ts`
3. Include tests for:
   - Page navigation
   - Content display
   - User interactions
   - Responsive design
   - Error states (if applicable)

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Writing Tests](https://playwright.dev/docs/writing-tests)
