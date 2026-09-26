

I want you to spend a while finding good example machines to use.

Here are some machines we have already:
<examples>
3D models: https://tormach.com/support/mill/pcnc-1100-solid-models-and-drawings
1100MX 3D models: https://tormach.com/support/mill/1100mx-solid-models-and-drawings
Operator's manual: https://tormach.com/media/asset/u/m/um10349_pcnc1100_manual_0520a_web.pdf
All documents: https://tormach.com/support/mill/pcnc-1100-series-3-documents
</examples>
YOUR TASK:
- Find examples of industrials machines that we can showcase in our product.
REQUIREMENTS:
- They MUST have 3d-model or schematics that we can use.
- They MUST have a large documentation manual (e.g. 100 pages) that is tedious to read through. (Bonus points if the documentation is in chinese or something)






YOUR GOAL:
You are taking on the role of a frontend designer and a

<MAIN_PAGES>
All main-pages have a sidebar on the right, visible at all times.
Sidebar tabs:
- machine_fix
- add-ticket tab
- add-machine tab
- organization_tab

<machine>
Machine-fix page.
This is where users go if they want to fix an issue with a machine.

`url.com/machine/<machine_pk>`

Vertical split down the middle, page divided into two halves.

Top-left: has a small floating dropdown UI where you can select the machine type.
Contains a whitelist of all machines within the org.

Left-side: Has a 3d-model pane showing the machine.
If the 
</machine>

<org>
Everything to do with managing an organization:

`url.com/machine/<org_pk>`

Adding / removing members by id.
</org>

<ticket>
Ticket page:

Filing docs for when something goes wrong with a machine,
OR, filing information about 
</ticket>

<add_machine>
Add machine page:

This is for when teams want to add a new machine to their organization.
If the users have no machines at all, this page should open by default.

Make sure to select:
- type of machine
- unique machine id (company internal identifier)
- and have a box at the bottom that tells a bunch of information about the machine, any recent events, etc.
</add_machine>
