
<situation>
We are a team participating in a hackathon over this weekend.
The theme is "b2b productivity Saas".

The hackathon lasts 3 days, $25k in prizes. 

By the end of the hackathon, (10am Sunday,) we must have a product deployed on a live domain, and the judges must be able to log in to create an account.

OUR GOAL: Make the frontend look clean and flashy. Make the product feel insanely good. **WE DO NOT NEED THE BACKEND TO BE WORKING PROPERLY.**
From a position of pure pragmatism: We are focusing on making the pitch really good, and we are focusing on making the product LOOK good.
- Having a working product is not important.
- Having a product that looks good, feels good, and can be showcased is *VERY IMPORTANT.*
</situation>


<problem_and_solution>
We are implementing a product that tackles the problem of tribal knowledge in manufacturing companies, and companies with niche machinery.


## PROBLEM:
Manufacturing companies burn billions of dollars per year on unplanned downtime.
A lot of the time, this downtime is due to niche errors with machines:
E.g: "CNC machine-1 warning-light turns red." No one is sure how to fix it except John, who is off-site. The nearest expert is in the city 2.5 hours away. Every hour the machine isn't working, the company is losing $6000.
The on-site engineers frantically search forums, read piles of documentation, search through arcane user-manuals in Chinese, search for exact serial numbers of related machines, etc.
By the time it's fixed, $11000 has been lost.

This problem is all too common in manufacturing shops.

## SOLUTION:
Have a knowledge-base for problems that go wrong with machines.
Categorize knowledge per machine, (and per machine family.)
If something goes wrong: instead of spending hours reading archaic documentation; users just query the LLM directly, and get a response instantly.

Likewise, companies can also add internal notes, or add internal information about their own machines. This allows companies

## HOW DOES THIS WORK?
Have 2 data-stores:
 Local store: Per company information: stores machine quirks specific to that company. E.g: "machine-2's left fan keeps breaking. Suspected instability in the motor? Keep spare fan parts stocked ALWAYS."
- Global store: Per machine type, across the entire industry. E.g: "Abascus-9 machines often stop working when too much debris enters the intake-valve. To fix this, clear the intake-valve, and press the flush-A button twice. Reset the machine, and it should work again"

The reason we have a global-store is because it gives customer value IMMEDIATELY.
The local-store allows our product to build up value over time, and allows us to create a data-moat.

</problem_and_solution>

<product>
We are essentially creating an AI powered "Machine operations knowledge base".

<pragmatic_goal_for_hackathon>
We do NOT want to build a complete product. We want to build something that can be showcased for the hackathon.

- Have a nice landing-page + login-form. (supabase)
- Have a big whitelist of machine-types. Encourage users to select from the whitelist instead of naming their own.
- Have a way to add/register new machines with the company.

IMPORTANT: Choose a couple of manufacturing machines (CNC machines?) that have known issues with them.
To get our "global information" about these machines, we should just find documentation in chinese, (something that's hard to access or generally inaccessible.)
This gives us a great thing to showcase.
</pragmatic_goal_for_hackathon>

</product>

<tech_stack>
- Supabase for auth + DB
- Nextjs + Vercel
- Tailwind + React + Typescript for frontend

- (Hardcode everything in the backend, keep it simple, make it look flashy)
</tech_stack>

