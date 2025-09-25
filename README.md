<h1>🛍️ Mini Product Showcase</h1>

<p>
  This project is a small web application built with
  <strong>Next.js</strong> (Pages Router), <strong>TypeScript</strong>, and
  <strong>Tailwind CSS</strong>.
</p>

<p>
  The goal is to implement a simple product showcase that displays a list of
  products and individual product detail pages, based on provided data.
</p>

<hr />

<h2>🧩 Task</h2>

<h3>Pages</h3>

<ul>
  <li>
    <code>/</code> — <strong>Home page</strong>
    <ul>
      <li>Displays a simple introduction.</li>
      <li>Shows a selection of featured products.</li>
    </ul>
  </li>
  <li>
    <code>/products</code> — <strong>Products page</strong>
    <ul>
      <li>Displays all products in a responsive grid layout.</li>
      <li>Shows product name, price, image (if available), and manufacturer.</li>
    </ul>
  </li>
  <li>
    <code>/products/[id]</code> — <strong>Product detail page</strong>
    <ul>
      <li>Displays full details of the selected product.</li>
      <li>Handles cases where an invalid product ID is entered.</li>
    </ul>
  </li>
</ul>

<h3>Components</h3>

<p>
  Please implement reusable React components where appropriate:
</p>

<ul>
  <li><code>Header</code> — with navigation links to <code>/</code> and <code>/products</code></li>
  <li><code>ProductCard</code> — displays basic product info (used in product lists)</li>
  <li><code>ProductList</code> — displays a grid of <code>ProductCard</code> components</li>
  <li><code>ProductDetail</code> — displays full product details</li>
</ul>

<p>You can add additional components as needed.</p>

<h3>Styling</h3>

<ul>
  <li>Use <strong>Tailwind CSS</strong> for styling.</li>
  <li>Ensure the layout is <strong>responsive</strong> on mobile and desktop.</li>
  <li>No need for pixel-perfect design — focus on clarity and usability.</li>
</ul>

<h3>Data</h3>

<p>
  You will find the product data in <code>products.ts</code> inside the <code>data</code> folder in the root of the project.
</p>

<p>
  The file contains an array of products based on our backend API. You can use this data to render the product list and product details.
</p>

<h3>Bonus Task (Optional)</h3>

<p>
   If you have time, feel free to implement one of the following:
</p>

<ul>
  <li>Set up a testing library (e.g. <a href="https://testing-library.com/docs/react-testing-library/intro/">React Testing Library</a> + Jest) and write one or more simple component tests.</li>
  <li>Add basic filtering or sorting on the <code>/products</code> page (e.g. filter by manufacturer or sort by price).</li>
</ul>

<p>
  The bonus task is optional and not required for completing the main task.
</p>



<hr />

<h2>🏃 Getting Started</h2>

<h3>Install dependencies</h3>

<pre><code>yarn install</code></pre>

<h3>Run the development server</h3>

<pre><code>yarn dev</code></pre>

<p>
  Open your browser at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> to view the application.
</p>

<hr />

<h2>🚀 Tech Stack</h2>

<ul>
  <li><a href="https://nextjs.org/">Next.js</a> (Pages Router)</li>
  <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
  <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
  <li><a href="https://prettier.io/">Prettier</a> for code formatting</li>
</ul>

<hr />

<p>Have fun and happy coding! 🎉</p>
