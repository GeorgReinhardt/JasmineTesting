describe("TodoList", function () {

	beforeEach(function () {
	//Todo-Liste erstellen
		localStorage.clear();

		todo = "do homework";
		date = "5.7.2017";

		list = new TodoList(null, function () {});
	});

	// TESTEN
	it("is defined", function () {
		expect(list).toBeDefined();
	});

	describe("TodoList.add", function () {

		it("adds a todo to the list", function () {
			list.add(todo, date);
			expect(list.getTodo(0).text).toEqual(todo);
			expect(list.getTodo(0).date).toEqual(date);
		});
		it("increments the indexCounter", function () {
			list.add(todo, date)
			expect(list.getIndexCounter()).toBe(1);
		});
		it("increments the indexCounter by 3 if 3 todos are added", function () {
			list.add(todo, date);
			list.add(todo, date);
			list.add(todo, date);
			expect(list.getIndexCounter()).toBe(3);
		});
	});

	describe("TodoList.remove", function () {

		it("removes the todo with the correct index if 3 todos where added", function () {
			list.add(todo, date);
			list.add(todo, date);
			list.add(todo, date);
			list.remove("1");
			expect(list.getTodo(1)).toBeUndefined();
		});
		it("removes the 2 todos with the correct index if 5 todos where added", function () {
			list.add(todo, date);
			list.add(todo, date);
			list.add(todo, date);
			list.add(todo, date);
			list.add(todo, date);
			list.remove("2");
			list.remove("4");
			expect(list.getTodo(2)).toBeUndefined();
			expect(list.getTodo(4)).toBeUndefined();
		});
	});

	describe("TodoList.repaint", function () {

		it("marks an todo if it has the date of today", function () {
			currentDate = new Date().toLocaleDateString();
			list.add(todo, currentDate);
			expect(list.getTodo(0).isMarked).toBe(true);
		});
		it("does not mark an todo if it has not the date of today", function () {
			currentDate = new Date().toLocaleDateString();
			list.add(todo, date);
			expect(list.getTodo(0).isMarked).toBe(false);
		});
	});
});