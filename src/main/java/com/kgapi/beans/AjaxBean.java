package com.kgapi.beans;

public class AjaxBean 
{
	private boolean status;
	private int id;
	
	private String note1;
	private String note2;
	private String note3;
	private Object obj;

	public AjaxBean() {super();}

	public AjaxBean(boolean status, int id, String note1, String note2,
			String note3, Object obj) {
		super();
		this.status = status;
		this.id = id;
		this.note1 = note1;
		this.note2 = note2;
		this.note3 = note3;
		this.obj = obj;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNote1() {
		return note1;
	}

	public void setNote1(String note1) {
		this.note1 = note1;
	}

	public String getNote2() {
		return note2;
	}

	public void setNote2(String note2) {
		this.note2 = note2;
	}

	public String getNote3() {
		return note3;
	}

	public void setNote3(String note3) {
		this.note3 = note3;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}
}
