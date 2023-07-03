package com.web.nl.controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.web.nl.payload.response.*;
import com.web.nl.models.ResponseObject;

@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", allowCredentials = "true", maxAge = 36000)
@RestController
@RequestMapping("/api/address")
public class AddressController {
	@GetMapping("/listProvince")
	  public ResponseEntity<ResponseObject> listProvince(){
		  try
		  {
	          Class.forName("com.mysql.cj.jdbc.Driver");
	          String connUrl="jdbc:mysql://localhost:3306/webdata?";
	          Connection conn=DriverManager.getConnection(connUrl,"root","");
	          String sql="SELECT * FROM provinces WHERE administrative_region_id = 8";
	          Statement st = conn.createStatement();
	          ResultSet rs=st.executeQuery(sql);
	         
	          List<Province> result=new ArrayList<Province>();
	          while(rs.next()) 
	          {   
	        	 
	        		  result.add(new Province(rs.getString("code"),rs.getString("name"),rs.getString("full_name")));
	        	
	          }
	        
	          conn.close();
	          System.out.println(result);
	          return ResponseEntity.status(HttpStatus.OK)
	  				.body(new ResponseObject("Success", "Increase successfully",result ));
		  }
	      catch(Exception ex)
	      {
	          System.out.println(ex.getMessage());
	         
	      }
		  return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Error", "getList error","" ));
		  
	  }
	@GetMapping("/listDistrict/{provinceId}")
	  public ResponseEntity<ResponseObject> listDistrict(@PathVariable String provinceId){
		  try
		  {
	          Class.forName("com.mysql.cj.jdbc.Driver");
	          String connUrl="jdbc:mysql://localhost:3306/webdata?";
	          Connection conn=DriverManager.getConnection(connUrl,"root","");
	          String sql="SELECT * FROM districts WHERE province_code= "+provinceId;
	          Statement st = conn.createStatement();
	          ResultSet rs=st.executeQuery(sql);
	         
	          List<District> result=new ArrayList<District>();
	          while(rs.next()) 
	          {   
	        	 
	        		  result.add(new District(rs.getString("code"),rs.getString("name"),rs.getString("full_name")) );
	        	
	          }
	        
	          conn.close();
	          System.out.println(result);
	          return ResponseEntity.status(HttpStatus.OK)
	  				.body(new ResponseObject("Success", "Increase successfully",result ));
		  }
	      catch(Exception ex)
	      {
	          System.out.println(ex.getMessage());
	         
	      }
		  return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Error", "getList error","" ));
		  
	  }
	
	@GetMapping("/listWard/{districtId}")
	  public ResponseEntity<ResponseObject> listWard(@PathVariable String districtId){
		  try
		  {
	          Class.forName("com.mysql.cj.jdbc.Driver");
	          String connUrl="jdbc:mysql://localhost:3306/webdata?";
	          Connection conn=DriverManager.getConnection(connUrl,"root","");
	          String sql="SELECT * FROM wards WHERE district_code="+districtId;
	          Statement st = conn.createStatement();
	          ResultSet rs=st.executeQuery(sql);
	         
	          List<Ward> result=new ArrayList<Ward>();
	          while(rs.next()) 
	          {   
	        	 
	        		  result.add(new Ward(rs.getString("code"),rs.getString("name"),rs.getString("full_name")) );
	        	
	          }
	        
	          conn.close();
	          System.out.println(result);
	          return ResponseEntity.status(HttpStatus.OK)
	  				.body(new ResponseObject("Success", "Increase successfully",result ));
		  }
	      catch(Exception ex)
	      {
	          System.out.println(ex.getMessage());
	         
	      }
		  return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Error", "getList error","" ));
		  
	  }
}
